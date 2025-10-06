// const newsContainerRef = document.querySelector('.news__content-list');

// async function newsRendering() {
//   const sendData = new FormData();
//   sendData.append('action', 'news');
//   let newsData = await fetch('/wp-admin/admin-ajax.php', {
//     method: 'POST',
//     body: sendData,
//   });

//   newsData = await newsData.json();
//   newsCard = newsData.result;
//   newsContainerRef.innerHTML = '';

//   newsCard.forEach(card => {
//     newsContainerRef.innerHTML += card;
//   });
// }

// newsRendering();
