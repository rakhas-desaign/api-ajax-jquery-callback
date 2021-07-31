$('.search-button').on('click', function () {
 $.ajax({
  url: 'http://www.omdbapi.com/?apikey=b8b8bddd&s=' + $('.input-keyword').val(),
  success: req => {
   const movis = req.Search;
   let cards = '';
   movis.forEach(m => {
    cards += showCards(m);
   });
   $('.ajax').html(cards);



   $('.modal-detail-button').on('click', function () {
    $.ajax({
     url: 'http://www.omdbapi.com/?apikey=b8b8bddd&i=' + $(this).data('imdbid'),
     success: m => {
      const moviDetail = showMoviesDetail(m);
      $('.modal-body').html(moviDetail);
      error: e => {
       console.log(e.responseText);
      }
     }
    });
   });

  },
  error: e => {
   console.log(e.responseText);
  }

 });

})


function showCards(m) {
 return `
<div class="col md-4 my-2">
             <div class="card">
                 <img src="${m.Poster}" class="card-img-top" alt="">
                 <div class="card-body">
                     <h5 class="card-title ">${m.Title}</h5>
                     <h6 class="card-subtitle text-muted mb-2">${m.Year}</h6>


                     <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">show detail</a>
                 </div>
             </div>
         </div>`;
};

function showMoviesDetail(m) {
 return `
 <div class="container-fluid">
  <div class="row">
      <div class="col-md-3">
          <img src="${m.Poster}" alt="gambar" class="img-fluid">
      </div>
      <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item">
                  <h2>${m.Title}</h2>
              </li>
              <li class="list-group-item"><strong>DIRECTOR::</strong>${m.Director}</li>
              <li class="list-group-item"><strong>RELEASED::</strong>${m.Released}</li>
              <li class="list-group-item"><strong>GENRE::</strong>${m.Genre}</li>
              <li class="list-group-item"><strong>ACTOR::</strong>${m.Actors}</li>
              <li class="list-group-item"><strong>PLOT::</strong>${m.Plot}</li>
          </ul>
      </div>
   </div>
  </div>`;
};