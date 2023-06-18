const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch_list li');

const markerInfo = [
	{
		title: 'KBS',
		position: new kakao.maps.LatLng(37.524798972757594, 126.91675264356007),
		imgSrc: 'img/location/marker.png',
		imgSize: new kakao.maps.Size(50, 64),
		imgPos: { offset: new kakao.maps.Point(25, 32) },
		button: btns[0],
	},
	{
		title: 'MBC',
		position: new kakao.maps.LatLng(37.581326703417176, 126.89081503125949),
		imgSrc: 'img/location/marker.png',
		imgSize: new kakao.maps.Size(50, 64),
		imgPos: { offset: new kakao.maps.Point(25, 32) },
		button: btns[1],
	},
	{
		title: 'SBS',
		position: new kakao.maps.LatLng(37.52929966560047, 126.87378508458899),
		imgSrc: 'img/location/marker.png',
		imgSize: new kakao.maps.Size(50, 64),
		imgPos: { offset: new kakao.maps.Point(25, 32) },
		button: btns[2],
	},
];

const map = new kakao.maps.Map(mapContainer, { center: markerInfo[0].position, level: 3 });

markerInfo.forEach((info) => {
	const marker = new kakao.maps.Marker({
		position: info.position,
		image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos),
	});
	marker.setMap(map);
	info.button.addEventListener('click', () => map.panTo(info.position));
});
