class ContentItem {
  constructor() {
    this.data = new Map([]);
    this.consumer_key = "";
    this.consumer_secret = "";
    this.content_items = "";
    this.oauth_nonce = "";
    this.oauth_timestamp = "";
    this.oauth_signature = "";
    this.oauth_signature_method = "";
  }
}

class JWTPayload {
  constructor() {
    this.header = Object;
    this.body = Object;
    this.verified = false;
    this.return_url = "";
    this.error_url = "";
    this.jwt = "";
    this.return_json = "";
    this.names_roles = false;
    this.grading = false;
  }
}

class NRPayload {
  constructor() {
    this.url = "";
    this.version = "";
    this.body = Object;
    this.orig_body = Object;
    this.return_url = "";
    this.difference_url = "";
    this.next_url = "";
  }
}

class GroupsPayload {
  constructor() {
    this.url = "";
    this.version = "";
    this.body = Object;
    this.orig_body = Object;
    this.return_url = "";
    this.next_url = "";
  }
}

class AGPayload {
  constructor() {
    this.orig_body = Object;
    this.claim = Object;
    this.scopeLineItem = false;
    this.scopeLineItemReadonly = false;
    this.scopeResult = false;
    this.scopeScore = false;
    this.lineItems = "";
    this.lineitem = [];
  }
}

class SetupParameters {
  constructor() {
    this.privateKey = "";
    this.publicKey = "";
    this.tokenEndPoint = "";
    this.oidcAuthUrl = "";
    this.issuer = "";
    this.applicationId = "";
    this.devPortalHost = "";
    this.cookies = "";
  }
}
module.exports = {
  ContentItem,
  JWTPayload,
  NRPayload,
  GroupsPayload,
  AGPayload,
  SetupParameters
}