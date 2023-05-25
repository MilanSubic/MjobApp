package web.mjob.models.dto;

import lombok.Data;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
public class Request<T> {
    int current;
    int pageSize;
    Sort.Direction direction;
    String property;
    T filter;
}
