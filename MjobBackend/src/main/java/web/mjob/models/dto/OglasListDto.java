package web.mjob.models.dto;

import lombok.Data;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Data
public class OglasListDto {
    private Long totalPages;
    private Long totalElements;
    private int currentPage;
    private int pageSize;
    private List<Oglas> content;

    public OglasListDto(Long totalPages, Long totalElements, int currentPage, int pageSize, List<Oglas> content) {
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.content = content;
    }
}
