from shell_sandbox.browser_guard import is_browser_request


def test_rejects_cross_site_fetch_metadata():
    assert is_browser_request({"sec-fetch-site": "cross-site"})


def test_rejects_origin_without_fetch_metadata():
    assert is_browser_request({"origin": "https://evil.example"})


def test_allows_agent_requests_without_browser_headers():
    assert not is_browser_request({})


def test_allows_same_origin_fetch_metadata():
    assert not is_browser_request({"sec-fetch-site": "same-origin"})
