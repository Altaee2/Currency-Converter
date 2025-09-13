// Function to handle currency conversion
document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const fromCurrency = document.getElementById('from_currency').value;
    const toCurrency = document.getElementById('to_currency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Show a loading message
    document.getElementById('result').innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> جاري التحويل...</p>';

    // API Call
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.rates[toCurrency]) {
                const rate = data.rates[toCurrency];
                const convertedAmount = amount * rate;
                document.getElementById('result').innerHTML = `
                    <p><strong>المبلغ المحول:</strong> ${convertedAmount.toFixed(2)} ${toCurrency}</p>
                    <p><strong>سعر الصرف:</strong> 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}</p>
                `;
            } else {
                document.getElementById('result').innerHTML = '<p style="color: red;">حدث خطأ في التحويل. يرجى المحاولة لاحقًا.</p>';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = '<p style="color: red;">فشل جلب بيانات العملة. يرجى التحقق من اتصالك بالإنترنت.</p>';
            console.error('Error fetching data:', error);
        });
});

// Function to handle the currency swap button
document.getElementById('swap-btn').addEventListener('click', function() {
    const fromCurrency = document.getElementById('from_currency');
    const toCurrency = document.getElementById('to_currency');
    const tempValue = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempValue;
});