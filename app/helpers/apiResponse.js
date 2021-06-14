/**
 *  Created by Atuma Daniel on 10/06/2021.
 */

exports.successResponse = function (res, msg) {
	var data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};


exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.createdResponse = function (res, msg) {
	var data = {
		status: 1,
		message: msg
	};
	return res.status(201).json(data);
};

exports.createdResponseWithData = function (res, msg, data) {
	var data = {
		status: 1,
		message: msg,
		data
	};
	return res.status(201).json(data);
};

exports.errorResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
		data: null
	};
	return res.status(500).json(data);
};

exports.forbiddenResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
		data: null
	};
	return res.status(403).json(data);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationError = function (res, msg) {
	var resData = {
		status: 0,
		message: msg,
	};
	return res.status(400).json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};
exports.validationError = function (res, msg) {
	var resData = {
		status: 0,
		message: msg,
		data: null
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};

exports.incompleteParametersError = function (res, msg) {

	var data = {
		status: 0,
		message: msg,
	};
	return res.status(422).json(data);
}