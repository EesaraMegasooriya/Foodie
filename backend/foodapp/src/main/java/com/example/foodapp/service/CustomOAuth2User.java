package com.example.foodapp.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

/**
 * A flexible wrapper class for OAuth2 and OIDC users,
 * providing easy access to common attributes.
 */
public class CustomOAuth2User implements OAuth2User, OidcUser {

    private final OAuth2User oauth2User;
    private final OidcUser oidcUser;

    public CustomOAuth2User(OAuth2User oauth2User) {
        this.oauth2User = oauth2User;
        this.oidcUser = oauth2User instanceof OidcUser ? (OidcUser) oauth2User : null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oauth2User.getAuthorities();
    }

    @Override
    public String getName() {
        Object name = oauth2User.getAttribute("name");
        return name != null ? name.toString() : getEmail();
    }

    @Override
    public String getEmail() {
        Object email = oauth2User.getAttribute("email");
        return email != null ? email.toString() : null;
    }

    public String getPictureUrl() {
        Object picture = oauth2User.getAttribute("picture");
        return picture != null ? picture.toString() : null;
    }

    @Override
    public String getLocale() {
        Object locale = oauth2User.getAttribute("locale");
        return locale != null ? locale.toString() : null;
    }

    public String getProviderId() {
        return oauth2User.getName();
    }

    // Required OidcUser methods

    @Override
    public Map<String, Object> getClaims() {
        return oidcUser != null ? oidcUser.getClaims() : null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return oidcUser != null ? oidcUser.getUserInfo() : null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return oidcUser != null ? oidcUser.getIdToken() : null;
    }
}
