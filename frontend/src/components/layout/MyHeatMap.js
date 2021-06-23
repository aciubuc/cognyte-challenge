import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const getMaxLatitude = (residences) => {
    return Math.max.apply(Math, residences.map(function(residence) { return residence.latitude; }));
}
const getMinLatitude = (residences) => {
    return Math.min.apply(Math, residences.map(function(residence) { return residence.latitude; }));
}
const getMaxLongitude = (residences) => {
    return Math.max.apply(Math, residences.map(function(residence) { return residence.longitude; }));
}
const getMinLongitude = (residences) => {
    return Math.min.apply(Math, residences.map(function(residence) { return residence.longitude; }));
}
const getInitialMapCoords = (residences) => {
    const minLatitude = getMinLatitude(residences);
    const latitude = minLatitude + (getMaxLatitude(residences) - minLatitude) / 2;
    const minLongitude = getMinLongitude(residences);
    const longitude = minLongitude + (getMaxLongitude(residences) - minLongitude) / 2;
    return {latitude: latitude, longitude: longitude};
}
export default function MyHeatMap() {
    useEffect(() => {
        fetch('/residences')
            .then(res => res.json())
            .then(residences => {
                const initialMapCoords = getInitialMapCoords(residences);
                let initialLatitude = isNaN(initialMapCoords.latitude) ? 45.6427 : initialMapCoords.latitude;
                let initialLongitude = isNaN(initialMapCoords.longitude) ? 25.5887 : initialMapCoords.longitude;
                var map = L.map("map").setView([initialLatitude, initialLongitude], 15);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                const points = residences
                    ? residences.map((residence) => {
                        return [residence.latitude, residence.longitude, residence.residentsNumber];
                    })
                    : [];

                L.heatLayer(points).addTo(map);
            });
    }, []);

    return <div id="map" style={{ height: "100vh" }}></div>;
}
