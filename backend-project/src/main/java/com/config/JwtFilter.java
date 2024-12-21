package com.config;

import com.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Base64;

@Component
public class JwtFilter extends org.springframework.web.filter.OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authorizationHeader);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7); 
            System.out.println("Extracted Token: " + token);

           
            String[] tokenParts = token.split("\\.");
            if (tokenParts.length == 3) {
                String header = new String(Base64.getDecoder().decode(tokenParts[0]));
                String payload = new String(Base64.getDecoder().decode(tokenParts[1]));
                String signature = tokenParts[2];
                System.out.println("Header: " + header);
                System.out.println("Payload: " + payload);
                System.out.println("Signature: " + signature);
            } else {
                System.out.println("Invalid JWT Format");
            }

            try {
                String username = jwtUtil.extractUsername(token); 
                System.out.println("Extracted Username: " + username);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    if (jwtUtil.validateToken(token, username)) {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                username, null, null); 
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("Authentication Set in SecurityContextHolder");
                    } else {
                        System.out.println("Token Validation Failed");
                    }
                }
            } catch (Exception e) {
                System.out.println("Error while processing JWT: " + e.getMessage());
            }
        } else {
            System.out.println("Authorization Header Missing or Malformed");
        }

        chain.doFilter(request, response);
    }
}
