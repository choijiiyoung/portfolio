const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch_list li');
const btnToggle = document.querySelector('.btn_toggle');
let active_index = 0;
let toggle = false;

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
map.setZoomable(false);

const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

markerInfo.forEach((info, idx) => {
	const marker = new kakao.maps.Marker({
		position: info.position,
		image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos),
	});
	marker.setMap(map);

	info.button.addEventListener('click', () => {
		active_index = idx;
		map.panTo(info.position);

		for (const el of btns) el.classList.remove('on');
		btns[idx].classList.add('on');
	});
});

//윈도우 리사이즈 시
window.addEventListener('resize', () => {
	map.setCenter(markerInfo[active_index].position);
});

//교통정보 토글버튼
btnToggle.addEventListener('click', () => {
	toggle = !toggle;
	if (toggle) {
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnToggle.innerHTML = 'Traffic ON';
		mapContainer.style.filter = 'grayscale(0%)';
	} else {
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnToggle.innerHTML = 'Traffic OFF';
		mapContainer.style.filter = 'grayscale(100%)';
	}
});
