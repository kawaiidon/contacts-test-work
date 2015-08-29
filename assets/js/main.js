// Для анимации инпутов

(function() {
				// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
				if (!String.prototype.trim) {
					(function() {
						// Make sure we trim BOM and NBSP
						var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
						String.prototype.trim = function() {
							return this.replace(rtrim, '');
						};
					})();
				}

				[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
					// in case the input is already filled..
					if( inputEl.value.trim() !== '' ) {
						classie.add( inputEl.parentNode, 'input--filled' );
					}

					// events:
					inputEl.addEventListener( 'focus', onInputFocus );
					inputEl.addEventListener( 'blur', onInputBlur );
				} );

				function onInputFocus( ev ) {
					classie.add( ev.target.parentNode, 'input--filled' );
				}

				function onInputBlur( ev ) {
					if( ev.target.value.trim() === '' ) {
						classie.remove( ev.target.parentNode, 'input--filled' );
					}
				}
})();

// Гуглокарты

function initialize() {
    
    //получаем наш div куда будем карту добавлять
    var mapCanvas = document.getElementById('map_canvas');
    var markerImage = new google.maps.MarkerImage(
    'img/gmap.png',
    new google.maps.Size(100,110),
    new google.maps.Point(0,0)
);
      var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {lightness: -52},
          {visibility: 'simplified'},
          {saturation: -100},
        ]
      }
    ], {
      name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';
    // задаем параметры карты
    var mapOptions = {
        //Это центр куда спозиционируется наша карта при загрузке
        center: new google.maps.LatLng(55.741668, 37.598930),
        //увеличение под которым будет карта, от 0 до 18
        // 0 - минимальное увеличение - карта мира
        // 18 - максимально детальный масштаб
        zoom: 15, 
        // убираем уи
        disableDefaultUI: true,
        // убираем прокрутку и тд
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        disableDoubleClickZoom: true,
         //Тип карты - обычная дорожная карта
        mapTypeId: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    };
    //Инициализируем карту
    
    var map = new google.maps.Map(mapCanvas, mapOptions);
 
    //Объявляем массив с нашими местами и маркерами
    var markers = [],
        myPlaces = [];
    //Добавляем места в массив
    myPlaces.push(new Place('Рандомное место', 55.741330, 37.598930, 'Чото тут есть'));
    

 
    //Теперь добавим маркеры для каждого места
    for (var i = 0, n = myPlaces.length; i < n; i++) {
        var marker = new google.maps.Marker({
            icon: markerImage,
            //расположение на карте
            position: new google.maps.LatLng(myPlaces[i].latitude, myPlaces[i].longitude),
            map: map,
            //То что мы увидим при наведении мышкой на маркер
            title: myPlaces[i].name
        });
        //Добавим попап, который будет появляться при клике на маркер
        var infowindow = new google.maps.InfoWindow({
            content: '<h1>' + myPlaces[i].name + '</h1><br/>' + myPlaces[i].description
        });
        //привязываем попап к маркеру на карте
        makeInfoWindowEvent(map, infowindow, marker);
        markers.push(marker);
    }
      map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}
function makeInfoWindowEvent(map, infowindow, marker) {
    //Привязываем событие КЛИК к маркеру
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
//Это класс для удобного манипулирования местами
function Place(name, latitude, longitude, description){
    this.name = name;  // название
    this.latitude = latitude;  // широта
    this.longitude = longitude;  // долгота
    this.description = description;  // описание места
}
//Когда документ загружен полностью - запускаем инициализацию карты.

google.maps.event.addDomListener(window, 'load', initialize);