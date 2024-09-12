// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAW9X87jDJ9CIcsDKjPN47XDVNAYT5Hh3s",
    authDomain: "cdn-69.firebaseapp.com",
    databaseURL: "https://cdn-69-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cdn-69",
    storageBucket: "cdn-69.appspot.com",
    messagingSenderId: "150667087421",
    appId: "1:150667087421:web:2864406dec328459f86454"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    const uploadTask = storageRef.child(file.name).put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Progress tracking
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);
        },
        () => {
            // Handle successful uploads
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                document.getElementById('file-url').innerHTML = `File uploaded successfully! <br> Public URL: <a href="${downloadURL}" target="_blank">${downloadURL}</a>`;
            });
        }
    );
});
