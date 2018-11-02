'use strict';

app.controller('ChartsCtrl', function (
    $scope,
    $filter,
    $rootScope,
    SCapiService,
    SC2apiService,
    utilsService,
    $stateParams,
    reactInterface,
    $timeout
) {
    var tracksIds = [];
    $scope.genres = [
        {
            "link": 'all-music',
            "title": "All"
        },
        {
            "link": 'alternativerock',
            "title": "Alternative Rock"
        },
        {
            "link": 'ambient',
            "title": "Ambient"
        },
        {
            "link": 'classical',
            "title": "Classical"
        },
        {
            "link": 'country',
            "title": "Country"
        },
        {
            "link": 'danceedm',
            "title": "Dance & EDM"
        },
        {
            "link": 'dancehall',
            "title": "Dancehall"
        },
        {
            "link": 'deephouse',
            "title": "Deep House"
        },
        {
            "link": 'disco',
            "title": "Disco"
        },
        {
            "link": 'drumbass',
            "title": "Drum & Bass"
        },
        {
            "link": 'dubstep',
            "title": "Dubstep"
        },
        {
            "link": 'electronic',
            "title": "Electronic"
        },
        {
            "link": 'folksingersongwriter',
            "title": "Folk & Singer-Songwriter"
        },
        {
            "link": 'hiphoprap',
            "title": "Hip-hop & Rap"
        },
        {
            "link": 'house',
            "title": "House"
        },
        {
            "link": 'indie',
            "title": "Indie"
        },
        {
            "link": 'jazzblues',
            "title": "Jazz & Blues"
        },
        {
            "link": 'latin',
            "title": "Latin"
        },
        {
            "link": 'metal',
            "title": "Metal"
        },
        {
            "link": 'piano',
            "title": "Piano"
        },
        {
            "link": 'pop',
            "title": "Pop"
        },
        {
            "link": 'rbsoul',
            "title": "R&B & Soul"
        },
        {
            "link": 'reggae',
            "title": "Reggae"
        },
        {
            "link": 'reggaeton',
            "title": "Reggaeton"
        },
        {
            "link": 'rock',
            "title": "Rock"
        },
        {
            "link": 'soundtrack',
            "title": "Soundtrack"
        },
        {
            "link": 'techno',
            "title": "Techno"
        },
        {
            "link": 'trance',
            "title": "Trance"
        },
        {
            "link": 'trap',
            "title": "Trap"
        },
        {
            "link": 'triphop',
            "title": "Triphop"
        },
        {
            "link": 'world',
            "title": "World"
        }
    ];

    var url_genre = $stateParams.genre;
    var genre = {};
    if(!url_genre){
        genre = {
            "link" : "all-music",
            "title" : "All Music"
        }
    }else{
        genre = $filter('filter')($scope.genres, {"link":url_genre}, true)[0]
    }

    $scope.title = 'Top 50 - '+genre.title;
    $scope.data = '';
    $scope.busy = false;


  reactInterface.stores.chartsStore.setGenre(genre.link);
  reactInterface.stores.chartsStore.fetchCharts();

  const unsubscribeTracks = reactInterface.watch(() => {
    const tracks = Array.from(reactInterface.stores.chartsStore.tracks);
    $rootScope.isLoading = false;

    $timeout(() => {
      $scope.data = tracks;
    }, 0);
  });

  $scope.$on('$destroy', () => {
    unsubscribeTracks();
  });


});
