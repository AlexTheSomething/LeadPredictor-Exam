document.addEventListener('DOMContentLoaded', () => {
    const totalRevenueInput = document.getElementById('totalRevenue');
    const avgOrderValueInput = document.getElementById('avgOrderValue');
    const leadResponseRateInput = document.getElementById('leadResponseRate');
    const prospectResponseRateInput = document.getElementById('prospectResponseRate');

    const prospectsResult = document.getElementById('prospectsResult');
    const leadsResult = document.getElementById('leadsResult');
    const customersResult = document.getElementById('customersResult');
    
    const leadResponseRateVal = document.getElementById('leadResponseRateVal');
    const prospectResponseRateVal = document.getElementById('prospectResponseRateVal');

    function calculate() {
        const totalRevenue = parseFloat(totalRevenueInput.value) || 0;
        const avgOrderValue = parseFloat(avgOrderValueInput.value) || 1;
        const leadResponseRate = parseFloat(leadResponseRateInput.value) || 1;
        const prospectResponseRate = parseFloat(prospectResponseRateInput.value) || 1;

        // Formula 01: Customers = Total Revenue / Avg Order Value
        const customers = Math.round(totalRevenue / avgOrderValue);

        // Formula 02: Leads = Customers * 100 / Lead Response Rate
        const leads = Math.round(customers * 100 / leadResponseRate);

        // Formula 03: Prospects = Leads * 100 / Prospect Response Rate
        const prospects = Math.round(leads * 100 / prospectResponseRate);

        customersResult.textContent = customers;
        leadsResult.textContent = leads;
        prospectsResult.textContent = prospects;

        leadResponseRateVal.textContent = leadResponseRate.toFixed(2) + '%';
        prospectResponseRateVal.textContent = prospectResponseRate.toFixed(2) + '%';
        
        // Update range inputs visual track
        const leadPercent = leadResponseRate;
        leadResponseRateInput.style.background = linear-gradient(to right, #f8fafc  + leadPercent + %, #475569  + leadPercent + %);

        const prospectPercent = prospectResponseRate;
        prospectResponseRateInput.style.background = linear-gradient(to right, #f8fafc  + prospectPercent + %, #475569  + prospectPercent + %);
    }

    [totalRevenueInput, avgOrderValueInput, leadResponseRateInput, prospectResponseRateInput].forEach(input => {
        input.addEventListener('input', calculate);
    });

    calculate();
});
