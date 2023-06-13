package web.mjob.security;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public UserDetailsService jwtUserDetailsService;
    public JwtRequestFilter jwtRequestFilter;


    @Autowired
    public WebSecurityConfig(JwtAuthenticationEntryPoint authEntryPoint, UserDetailsService customUserDetailsService) {
        this.jwtAuthenticationEntryPoint = authEntryPoint;
        this.jwtUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


   // @Override
//    protected void configure(HttpSecurity httpSecurity) throws Exception {
//        // We don't need CSRF for this example
//        httpSecurity.csrf().disable()
//                // dont authenticate this particular request
//                .authorizeRequests().antMatchers("/authenticate").permitAll().
//                // all other requests need to be authenticated
//                        anyRequest().authenticated().and().
//                // make sure we use stateless session; session won't be used to
//                // store user's state.
//                        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//        // Add a filter to validate the tokens with every request
//        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//    }
//    //

   @Bean
   public CorsFilter corsFilter() {
       UrlBasedCorsConfigurationSource source =
               new UrlBasedCorsConfigurationSource();
       CorsConfiguration config = new CorsConfiguration();
       //treba true stavila sam false da bi radilo
       config.setAllowCredentials(false);
       config.addAllowedOrigin("*");
       config.addAllowedHeader("*");
       config.addAllowedMethod("*");
       config.addAllowedMethod("PATCH");
       source.registerCorsConfiguration("/**", config);
       return new CorsFilter(source);
   }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests().requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/api/registracija").permitAll()
                .requestMatchers("/api/registracija/**").permitAll()
                .requestMatchers("/api/korisnici1").permitAll()
                .requestMatchers("/api/korisnici1/**").permitAll()
                .requestMatchers("/ api/korisnik1Pol").permitAll()
                .anyRequest().permitAll();

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    ////
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public  JwtRequestFilter jwtAuthenticationFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public ModelMapper modelMapper()
    {
        return new ModelMapper();
    }
}
