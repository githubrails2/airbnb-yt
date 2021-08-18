import { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { BadgeCheckIcon } from "@heroicons/react/solid";
const Map = ({ searchResults }) => {
	const coordinates = searchResults.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));
	const center = getCenter(coordinates);
	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 8,
	});
	const [selectedLocation, setSelectedLocation] = useState({});

	return (
		<ReactMapGl
			{...viewport}
			mapStyle="mapbox://styles/mapboxairbnd/cksi05u4o0u6h19p10l7msqn6"
			mapboxApiAccessToken={process.env.mapbox_key}
			onViewportChange={(nextViewPort) => setViewport(nextViewPort)}>
			{searchResults.map((coord) => (
				<div key={coord.long}>
					<Marker
						longitude={coord.long}
						latitude={coord.lat}
						offsetLeft={-20}
						offsetTop={-10}>
						<p
							role="img"
							onClick={() => setSelectedLocation(coord)}
							className="cursor-pointer text-2xl animate-bounce"
							aria-label="push-pin">
							%
						</p>
					</Marker>
					{selectedLocation.long === coord.long ? (
						<Popup
							closeOnClick={true}
							onClose={() => setSelectedLocation({})}
							latitude={coord.lat}
							longitude={coord.long}>
							{coord.title}
						</Popup>
					) : null}
				</div>
			))}
		</ReactMapGl>
	);
};

export default Map;
