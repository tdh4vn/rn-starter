import firebase from 'react-native-firebase';

const storageRef = firebase.storage().ref()

export default uploadFile = (fileName, image) => {
  return new Promise((rev, rej) => {
    let mime = image.mime
    var metadata = {
      contentType: mime,
    };
    console.log(fileName)
    console.log(image)
    const uploadTask = storageRef.child(`images/${fileName}`).putFile(image.uri, metadata);
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          //console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          //console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.log("error")
      rej(error);
    }, (snapshot) => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      // uploadTask.sn

      rev(snapshot.downloadURL);
    });
  })

}