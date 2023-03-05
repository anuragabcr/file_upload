import express from "express";
import connectDB from './db.js'
import busboy from 'busboy';
import fs from 'fs';
import { TestDB, FileDB } from "./model.js";
import { storage } from './firebase.js';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const app = express();
app.use(express.json())
connectDB()
app.get('/', async (req, res, next) => {
    console.log('Express is working')
    const mongodb = await conn()
    res.send('Express is working')
})

app.post('/', async (req, res, next) => {
    console.log(req.body)
    await TestDB.create(req.body)
    res.send('Saved in db')
})


app.post('/upload_mongodb', (req, res) => {
    const bb = busboy({ headers: req.headers });
  
    bb.on('file', function(fieldname, file, info, encoding, mimetype) {
      file.pipe(fs.createWriteStream(info.filename)).on('finish', async () => {
        const temp = fs.readFileSync(info.filename)
        fs.unlinkSync(info.filename)
        await FileDB.create({name: info.filename, file: temp})
      })
    });
  
    bb.on('finish', function() {
      res.status(200).json({msg: 'File uploaded successfully to MongoDB'});
    });
  
    req.pipe(bb);
  });

  app.post('/upload_firebase', (req, res) => {
    let url;
    const bb = busboy({ headers: req.headers });
  
    bb.on('file', function(fieldname, file, info, encoding, mimetype) {
      file.pipe(fs.createWriteStream(info.filename)).on('finish', async () => {
        const temp = fs.readFileSync(info.filename)
        fs.unlinkSync(info.filename)
        const storageRef = ref(storage, `files/${info.filename}`);
        const uploadTask = await uploadBytesResumable(storageRef, temp);
        await getDownloadURL(uploadTask.ref).then((downloadURL) => {
          url = downloadURL;
        });
        res.status(200).json({msg: 'File uploaded successfully to firebase', url});
      })
    });
  
    bb.on('finish', function() {
      // res.status(200).json({msg: 'File uploaded successfully to firebase', url});
    });
  
    req.pipe(bb);
  });

  app.get('/upload', async (req, res) => {
    const data = await FileDB.findOne()
    res.send(data)
})

app.listen(3000, () => {
    console.log('Express server started on http://localhost:3000')
})