const express = require('express');
const fs = require('fs');
const path = require('path')
const uploadController = {};
const { google } = require('googleapis')
const CLIENT_ID = "746011004834-a0qgrtj4v0o9onjf4kgd3jf0hvcl175r.apps.googleusercontent.com"
const CLIENTE_SECRET = "YFV605O1qNE7V9qG34Mpqq31";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN ="1//04dAiFuoM17-tCgYIARAAGAQSNwF-L9Ir81LM-wemDIezR9FFCpZMRAL81ygtf-AGR6XHkiTrdY8z2xRuQnmw8uB6B441zDKdPYk";

uploadController.upload = async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
   

  
    
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENTE_SECRET,
        REDIRECT_URI

    )
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client

    })
    try {
        const response = await drive.files.create({
            requestBody: {
                name: "legajos.pdf",
                mimeType: 'application/pdf'

            },
            media: {
                mimeType: 'application/pdf',
                body: fs.createReadStream(req.file.path) 
            }
        })
        console.log(response.data.id);
        const fileId = response.data.id;
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
        res.json(result.data)
        console.log(result.data);
        fs.unlinkSync(req.file.path)
    } catch (error) {
        console.log(error)
    }


}


module.exports = uploadController;