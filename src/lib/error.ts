enum AppError {
	LocationPermissionDenied = "no_location_permission",
	NoGPSAPI = "no_gps_api",
	FailedToFetchAmenities = "fetch_failed",
	FailedToGetLocation = "location_failed",
}

export default AppError;
