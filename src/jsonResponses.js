

const respondJSON = (request, response, status, object, type) => {
  const content = JSON.stringify(object);

  response.writeHead(status, { 
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  return respondJSON(request, response, 200, responseJSON, response.type);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if(!request.query.valid || request.query.valid !== 'true'){
    responseJSON.message = "Missing valid query params set to true";
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  else
  {
    return respondJSON(request, response, 200, responseJSON);
  }

};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if(!request.query.loggedIn || request.query.loggedIn !== 'true'){
    responseJSON.message = "Missing loggedIn query parameters set to yes";
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }
  else
  {
    return respondJSON(request, response, 200, responseJSON);
  }
};


const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);

};


const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this Content',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);

};


const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const notImplimented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplimented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplimented,
};