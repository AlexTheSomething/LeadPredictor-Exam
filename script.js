document.addEventListener('DOMContentLoaded', () => {
    const totalRevenueInput = document.getElementById('totalRevenue');
    const avgOrderValueInput = document.getElementById('avgOrderValue');
    const leadResponseRateInput = document.getElementById('leadResponseRate');
    const prospectResponseRateInput = document.getElementById('prospectResponseRate');

    const prospectsResult = document.getElementById('prospectsResult');
    const leadsResult = document.getElementById('leadsResult');
    const customersResult = document.getElementById('customersResult');
    
    const prospectsPercent = document.getElementById('prospectsPercent');
    const leadsPercent = document.getElementById('leadsPercent');
    const customersPercent = document.getElementById('customersPercent');
    
    const leadResponseRateVal = document.getElementById('leadResponseRateVal');
    const prospectResponseRateVal = document.getElementById('prospectResponseRateVal');

    function calculate() {
        const totalRevenue = parseFloat(totalRevenueInput.value) || 0;
        const avgOrderValue = parseFloat(avgOrderValueInput.value) || 1;
        const leadResponseRate = parseFloat(leadResponseRateInput.value) || 0.01;
        const prospectResponseRate = parseFloat(prospectResponseRateInput.value) || 0.01;

        // Formula 01: Customers = Total Revenue / Avg Order Value
        const customers = Math.round(totalRevenue / avgOrderValue);

        // Formula 02: Leads = Customers * 100 / Lead Response Rate
        const leads = Math.round(customers * 100 / leadResponseRate);

        // Formula 03: Prospects = Leads * 100 / Prospect Response Rate
        const prospects = Math.round(leads * 100 / prospectResponseRate);

        // Update stats card values
        customersResult.textContent = customers;
        leadsResult.textContent = leads;
        prospectsResult.textContent = prospects;

        // Update stats card percentages
        prospectsPercent.textContent = '100%';
        leadsPercent.textContent = Math.round(prospectResponseRate) + '%';
        
        const calcCustPercent = prospects > 0 ? (customers * 100 / prospects) : 0;
        customersPercent.textContent = Math.round(calcCustPercent) + '%';

        // Update range inputs text labels
        leadResponseRateVal.textContent = leadResponseRate.toFixed(2) + '%';
        prospectResponseRateVal.textContent = prospectResponseRate.toFixed(2) + '%';
        
        // Update range inputs visual tracks
        leadResponseRateInput.style.background = `linear-gradient(to right, #f8fafc ${leadResponseRate}%, #475569 ${leadResponseRate}%)`;
        prospectResponseRateInput.style.background = `linear-gradient(to right, #f8fafc ${prospectResponseRate}%, #475569 ${prospectResponseRate}%)`;

        // Update Chart Rows dynamically (Month 1-5)
        for (let i = 1; i <= 5; i++) {
            const factor = i / 5;
            const mProspects = Math.round(prospects * factor);
            const mLeads = Math.round(leads * factor);
            const mCustomers = Math.round(customers * factor);

            // Relative widths inside the container (Month 5 is 100%)
            const pWidth = prospects > 0 ? (mProspects / prospects) * 100 : 0;
            const lWidth = prospects > 0 ? (mLeads / prospects) * 100 : 0;
            const cWidth = prospects > 0 ? (mCustomers / prospects) * 100 : 0;

            const barP = document.getElementById(`bar-p-${i}`);
            const barL = document.getElementById(`bar-l-${i}`);
            const barC = document.getElementById(`bar-c-${i}`);
            const row = document.getElementById(`row-${i}`);

            if (barP) barP.style.width = `${pWidth}%`;
            if (barL) barL.style.width = `${lWidth}%`;
            if (barC) barC.style.width = `${cWidth}%`;

            if (row) {
                row.setAttribute('data-tooltip', `Month #${i} | Prospects: ${mProspects}, Leads: ${mLeads}, Customers: ${mCustomers}`);
            }
        }
    }

    [totalRevenueInput, avgOrderValueInput, leadResponseRateInput, prospectResponseRateInput].forEach(input => {
        input.addEventListener('input', calculate);
    });

    calculate();
});
