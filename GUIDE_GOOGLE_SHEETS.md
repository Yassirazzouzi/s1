# Guide de configuration Google Sheets

Pour enregistrer les commandes dans un fichier Google Sheets, suivez ces étapes :

## 1. Préparer le fichier Google Sheets
1. Allez sur [Google Sheets](https://sheets.google.com) et créez une nouvelle feuille.
2. Renommez la feuille en **"Commandes"**.
3. Ajoutez les en-têtes suivants dans la première ligne (cases A1 à K1) :
   - ID Commande
   - Produit
   - Client
   - Téléphone
   - Ville
   - Adresse
   - Quantité
   - Prix Total
   - Statut
   - Date
   - Notes

## 2. Créer le script Google
1. Dans votre Google Sheet, cliquez sur **Extensions** > **Apps Script**.
2. Supprimez tout le code présent dans l'éditeur.
3. Copiez et collez le code ci-dessous :

\`\`\`javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.orderId,
      data.productName,
      data.customerName,
      data.phone,
      data.city,
      data.address,
      data.quantity,
      data.totalPrice,
      data.status,
      data.createdAt,
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

## 3. Déployer le script
1. Cliquez sur le bouton bleu **"Déployer"** en haut à droite > **"Nouveau déploiement"**.
2. Cliquez sur la roue dentée à côté de "Sélectionnez le type" et choisissez **"Application Web"**.
3. Remplissez les champs :
   - **Description** : API Commandes
   - **Exécuter en tant que** : Moi (votre email)
   - **Qui a accès** : **Tout le monde** (C'est très important pour que le site puisse envoyer les données).
4. Cliquez sur **"Déployer"**.
5. Autorisez l'accès si demandé.

## 4. Connecter au site
1. Copiez l'**URL de l'application Web** qui s'affiche (elle commence par `https://script.google.com/...`).
2. Retournez sur v0 ou votre projet Vercel.
3. Ajoutez cette URL dans vos variables d'environnement avec la clé :
   `GOOGLE_SHEET_WEBHOOK_URL`

Une fois cela fait, toutes les nouvelles commandes apparaîtront automatiquement dans votre fichier Excel (Google Sheet).
