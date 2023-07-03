package web.mjob.config;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import web.mjob.security.JwtTokenUtil;
import web.mjob.security.JwtUserDetailsService;

import java.util.List;

@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
    public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Autowired
    public JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    public JwtTokenUtil jwtTokenUtil;

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    List<String> tokenList = accessor.getNativeHeader("Authorization");
                    String token = null;
                    if (tokenList == null || tokenList.size() < 1) {
                        throw new IllegalArgumentException("test");
                    } else {
                        token = tokenList.get(0);
                        if (token == null) {
                            return message;
                        }

                        var jwtToken = token.substring(7);
                        try {
                            var username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);

                            // if token is valid configure Spring Security to manually set
                            // authentication
                            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

                                UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(
                                        userDetails, null, userDetails.getAuthorities());
                                accessor.setUser(user);
                            }

                        } catch (IllegalArgumentException e) {
                            System.out.println("Unable to get JWT Token");
                        } catch (ExpiredJwtException e) {
                            System.out.println("JWT Token has expired");
                        }
                    }
                       /* Authentication user = ... ; // access authentication header(s)
                        accessor.setUser(user);*/
                }
                return message;
            }
        });
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/konverzacija");
        registry.setUserDestinationPrefix("/konverzacija");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(2048 * 2048);
        registration.setSendBufferSizeLimit(2048 * 2048);
        registration.setSendTimeLimit(2048 * 2048);
    }
}