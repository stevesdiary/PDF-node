const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const app = express();
const path = require('path');
app.use(express.json());

app.get('/generate-pdf', (req, res) => {
   const { name, address, email, phone, amount, reference, currency, status, dateAndTime, description, paymentType, cardType, cardNumber, bankAndCountry } = req.body;
   
   const id = name + ' receipt' + Math.floor(Math.random() * 10) + '.pdf';
   const invoicePath = path.join('./output/',id)
   
   
   try{
      const doc = new PDFDocument({
         font: ('Helvetica'),
         size: 'A4',
      });
   
   doc.pipe(fs.createWriteStream('receipt.pdf'))
   
   doc.fontSize(16).text(name, { align: 'left'});

   doc
      .fontSize(12).moveDown(0.5).text(address)

   doc
      .fontSize(12).moveDown(0.5).text(email, {align: 'left',})

   doc.moveDown()
      .fontSize(12).moveDown(0.5).text(phone, { align: 'left'});

   doc.moveDown()
         .fontSize(14).text('PAYMENT RECEIPT - CREDIT ALERT DETAILS', {align: 'center'});

   doc.moveDown()
      .fontSize(12).text(amount, {align: 'left', width: 200});
   

   doc.moveUp()
      .fontSize(12).text(reference, {align: 'right'})

   doc.moveDown()
      .fontSize(12).text(currency, {align: 'left'})
      .fontSize(12).moveUp().text(status, {align: 'right'})

   doc.moveDown()
      .fontSize(12).text(dateAndTime, {align: 'left'})
      .fontSize(12).moveUp().text(description, {align: 'right'});
   
   doc.moveDown()
      .fontSize(12).text(paymentType, {align: 'left'})
      .fontSize(12).moveUp().text(cardType,  {align: 'right'})

   doc.moveDown()
      .fontSize(12).text(cardNumber, {align: 'left'})
      .fontSize(12).moveUp().text(bankAndCountry, {align: 'right'})
   

   doc.end();
   console.log('Pdf file generated successfully')

   return res.status(200).send({message: 'Pdf file generated successfully'})

   }catch(err){
      console.log(err)
      return res.status(500).send({message: 'Error generating PDF file', Error: err})
   }

});

app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});