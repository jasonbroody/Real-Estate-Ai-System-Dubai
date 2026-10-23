import { test, expect } from '@playwright/test';

test('hero CTA starts buyer; takeover stops timers and return leaves paused', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', {name:'Watch the Automation'}).click();
  const demo=page.locator('#demo');
  await expect(demo.locator('.bubble')).toHaveCount(1);
  await expect(demo.getByRole('button',{name:'Pause',exact:true})).toBeEnabled();
  await demo.getByRole('button',{name:'Human Takeover',exact:true}).click();
  const count=await demo.locator('.bubble').count();
  await expect(demo.getByRole('button',{name:'Next Step',exact:true})).toBeDisabled();
  await expect(demo.locator('.handover-banner')).toContainText('AI paused');
  await page.waitForTimeout(2300);
  await expect(demo.locator('.bubble')).toHaveCount(count);
  await demo.getByRole('button',{name:'Return Control to AI'}).click();
  await expect(demo.getByRole('button',{name:'Continue',exact:true})).toBeEnabled();
  await page.waitForTimeout(2300);
  await expect(demo.locator('.bubble')).toHaveCount(count);
  await demo.getByRole('button',{name:'Reset demo'}).click();
  await expect(demo.locator('.bubble')).toHaveCount(0);
});

for(const [persona,steps,finalText] of [['Buyer',11,'Maya will meet you'],['Broker',9,'Offer issued. Unit not reserved.'],['Owner',9,'Leila from after-sales'],['Internal Team',8,'Handover: two-bedroom']] as const){
  test(`${persona} completes with synchronised actions`,async({page})=>{
    await page.goto('/'); const demo=page.locator('#demo');
    await demo.getByRole('tab',{name:persona,exact:true}).click();
    for(let i=0;i<steps;i++) await demo.getByRole('button',{name:'Next Step',exact:true}).click();
    await expect(demo.locator('.bubble').last()).toContainText(finalText);
    await expect(demo.getByRole('button',{name:'Next Step',exact:true})).toBeDisabled();
    if(persona==='Internal Team')await expect(demo.locator('.handover-banner')).toBeVisible();
    await demo.getByRole('tab',{name:persona==='Buyer'?'Broker':'Buyer',exact:true}).click();
    await expect(demo.locator('.bubble')).toHaveCount(0);
    await expect(demo.getByRole('button',{name:'Play',exact:true})).toBeEnabled();
  });
}

test('pause/continue, exception states and duplicate claim require resolution',async({page})=>{
  await page.goto('/');const demo=page.locator('#demo');
  await demo.getByRole('button',{name:'Play',exact:true}).click();
  await demo.getByRole('button',{name:'Pause',exact:true}).click();
  await expect(demo.locator('.progress-label')).toContainText('Paused');
  await demo.getByRole('button',{name:'Continue',exact:true}).click();
  await expect(demo.locator('.progress-label')).toContainText('Playing');
  await demo.getByRole('tab',{name:'Broker',exact:true}).click();
  await demo.locator('.edge-cases summary').click();
  for(const state of ['Awaiting Verification','Awaiting Approval','Stale Data','Integration Failure','Duplicate client claim']){
    await demo.getByRole('button',{name:state,exact:true}).click();
    await expect(demo.locator('.exception-banner')).toContainText(state);
    await expect(demo.getByRole('button',{name:'Next Step',exact:true})).toBeDisabled();
    await demo.getByRole('button',{name:'Simulate resolution · leave paused'}).click();
    await expect(demo.getByRole('button',{name:'Play',exact:true})).toBeEnabled();
  }
});

test('dashboard, platform tabs, keyboard tabs, FAQs and pilot dialog work',async({page})=>{
  await page.goto('/');const dashboard=page.locator('#dashboard');
  for(const [tab,text] of [['Pipeline','BOOK-0102'],['Inventory','AED 1,650,000'],['Service desk','SR-0318'],['Inbox','Adam Wilson']]){
    await dashboard.getByRole('tab',{name:tab,exact:true}).click();
    await expect(dashboard.locator('table')).toContainText(text);
  }
  const platform=page.locator('#platform');
  await platform.getByRole('tab',{name:'Buyer',exact:true}).focus();await page.keyboard.press('ArrowRight');
  await expect(platform.getByRole('tab',{name:'Broker',exact:true})).toBeFocused();
  await expect(platform.locator('[role=tabpanel]')).toContainText('connected broker network');
  await page.locator('#faqs summary').first().click();
  await expect(page.locator('#faqs details').first()).toHaveAttribute('open','');
  const pilot=page.locator('.nav-cta');await pilot.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Third-party operating costs');
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(pilot).toBeFocused();
});

for(const width of [1440,768,390,320]){
  test(`layout at ${width}px, navigation and screenshot`,async({page})=>{
    await page.setViewportSize({width,height:1000});
    const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('/');await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width<961){await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation').getByRole('link',{name:'Interactive Demo'}).click();await expect(page.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');}
    for(const id of ['platform','how-it-works','demo','dashboard','faqs'])await expect(page.locator(`#${id}`)).toBeAttached();
    await page.locator('#demo').getByRole('button',{name:'Next Step',exact:true}).click();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`docs/screenshots/estateflow-${width}.png`,fullPage:true});
    expect(errors).toEqual([]);
  });
}
