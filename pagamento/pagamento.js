document.addEventListener("DOMContentLoaded", () => {
  const total = parseFloat(localStorage.getItem('valorTotal')) || 0;
  document.getElementById('resumoPagamento').textContent = `Total: R$ ${total.toFixed(2)}`;
});

function verificarPagamento() {
  const forma = document.getElementById("formaPagamento").value;
  if (forma === "Pix") {
    pagarPIX(); // Gera o QR Code automaticamente
  } else {
    document.getElementById("qrcode-area").style.display = "none";
    document.getElementById("qrcode").innerHTML = "";
  }
}


function pagarPIX() {
  const forma = document.getElementById("formaPagamento").value;
  if (forma !== "Pix") {
    alert("Selecione a forma de pagamento como Pix para gerar o QR Code.");
    return;
  }

  const valor = parseFloat(localStorage.getItem('valorTotal')) || 0;
  const chavePix = '73378690968'; // <- chave PIX real do recebedor
  const nomeRecebedor = 'Rebeca R. dos Santos ';
  const cidade = 'SAO PAULO';
  const descricao = 'Pagamento Cafeteria';

  function format(id, value) {
    const size = value.length.toString().padStart(2, '0');
    return `${id}${size}${value}`;
  }

  const merchantAccount = format("00", "BR.GOV.BCB.PIX") +
                          format("01", chavePix) +
                          format("02", descricao);

  const payloadSemCRC =
    format("00", "01") +
    format("26", merchantAccount) +
    format("52", "0000") +
    format("53", "986") +
    format("54", valor.toFixed(2)) +
    format("58", "BR") +
    format("59", nomeRecebedor) +
    format("60", cidade) +
    format("62", format("05", "***")) +
    "6304";

  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  const payloadCompleto = payloadSemCRC + crc16(payloadSemCRC);

  const qrCodeDiv = document.getElementById("qrcode");
  qrCodeDiv.innerHTML = '';
  document.getElementById("qrcode-area").style.display = "block";

  new QRCode(qrCodeDiv, {
    text: payloadCompleto,
    width: 250,
    height: 250,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  const info = document.createElement("div");
  info.className = "nome-valor";
  info.innerHTML = `
    <p><strong>Nome:</strong> ${nomeRecebedor}</p>
    <p><strong>CPF/CNPJ (PIX):</strong> ${chavePix}</p>
    <p><strong>Valor:</strong> R$ ${valor.toFixed(2)}</p>
  `;
  qrCodeDiv.appendChild(info);
}

function finalizarCompra() {
  alert("Compra finalizada com sucesso! Obrigado pela preferência 😊");
  localStorage.removeItem("carrinho");
  // Limpa o valor armazenado
  localStorage.removeItem('valorTotal');

  // Redireciona para o menu
  window.location.href = '../menu/menu.html';
}
