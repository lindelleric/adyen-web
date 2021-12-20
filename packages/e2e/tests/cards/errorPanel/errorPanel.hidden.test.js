import CardComponentPage from '../../_models/CardComponent.page';

const cardPage = new CardComponentPage();

fixture`Testing card, with holder name on top, error panel`
    .beforeEach(async t => {
        await t.navigateTo(cardPage.pageUrl);
    })
    .clientScripts('./errorPanel.hidden.clientScripts.js');

test('#1 Error panel is not present at start, when there are no errors', async t => {
    // Wait for field to appear in DOM
    await cardPage.numHolder();

    // error panel does not exist
    await t.expect(cardPage.errorPanelHidden.exists).notOk();
});

test('#2 Click pay with empty fields and hidden error panel is populated', async t => {
    // Wait for field to appear in DOM
    await cardPage.numHolder();

    // click pay, to validate & generate errors
    await t
        .click(cardPage.payButton)
        // error panel exists
        .expect(cardPage.errorPanelHidden.exists)
        .ok();

    // Expect 4 elements, in order, with specific text
    await t
        .expect(cardPage.errorPanelEls.nth(0).withText('Name on card:').exists)
        .ok()
        .expect(cardPage.errorPanelEls.nth(1).withText('Card number:').exists)
        .ok()
        .expect(cardPage.errorPanelEls.nth(2).withText('Expiry date:').exists)
        .ok()
        .expect(cardPage.errorPanelEls.nth(3).withText('Security code:').exists)
        .ok();

    // no 5th element
    await t.expect(cardPage.errorPanelEls.nth(4).exists).notOk();

    // Expect focus not to be place on holder name field - since SRConfig for this card comp says it shouldn't be
    await t.expect(cardPage.holderNameLabelWithFocus.exists).notOk();
});
