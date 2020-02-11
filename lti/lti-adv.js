// https://lti-ri.imsglobal.org/platforms/745/platform_keys/765.json

//OAuth2 Access Token URL value == token endpoint

exports.verifyToken = function (req, jwtPayload, setup) {
  console.log(id_token, jwtPayload, setup)
  let parts = id_token.split(".");

  // Parse and store payload data from launch
  jwtPayload.header = JSON.parse(Buffer.from(parts[0], "base64").toString());
  jwtPayload.body = JSON.parse(Buffer.from(parts[1], "base64").toString());
  jwtPayload.verified = false;

  if (
    jwtPayload.body[
      "https://purl.imsglobal.org/spec/lti/claim/launch_presentation"
    ] !== undefined
  ) {
    jwtPayload.return_url =
      jwtPayload.body[
        "https://purl.imsglobal.org/spec/lti/claim/launch_presentation"
      ].return_url;
    jwtPayload.error_url = jwtPayload.return_url;
  }
  if (
    jwtPayload.body[
      "https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice"
    ] !== undefined
  ) {
    jwtPayload.names_roles = true;
  }
  if (
    jwtPayload.body[
      "https://purl.imsglobal.org/spec/lti-ags/claim/endpoint"
    ] !== undefined
  ) {
    jwtPayload.grading = true;
  }
  if (
    jwtPayload.body[
      "https://purl.imsglobal.org/spec/lti-gs/claim/groupsservice"
    ] !== undefined
  ) {
    jwtPayload.groups = true;
  }

  // Verify launch is from correct party
  // aud could be an array or a single entry
  let clientId;
  if (jwtPayload.body.aud instanceof Array) {
    clientId = jwtPayload.body.aud[0];
  } else {
    clientId = jwtPayload.body.aud;
  }

  if (clientId === undefined) {
    clientId = setup.applicationId;
  }

  let url =
    setup.devPortalHost +
    "/api/v1/management/applications/" +
    clientId +
    "/jwks.json";
  // let url = `https://lti-ri.imsglobal.org/platforms/745/platform_keys/765.json`
  // Do a synchronous call to dev portal
  let res;
  try {
    res = srequest("GET", url);
  } catch (err) {
    return console.log("Verify Error - request failed: " + err);
  }

  if (res.statusCode !== 200) {
    return console.log(
      "Verify Error - jwks.json call failed: " + res.statusCode + "\n" + url
    );
  }

  try {
    jwt.verify(id_token, jwk2pem(JSON.parse(res.getBody("UTF-8")).keys[0]));
    jwtPayload.verified = true;
    console.log("JWT verified " + jwtPayload.verified);
  } catch (err) {
    console.log("Verify Error - verify failed: " + err);
    jwtPayload.verified = false;
  }
};