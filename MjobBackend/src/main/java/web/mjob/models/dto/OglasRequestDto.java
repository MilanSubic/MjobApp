package web.mjob.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class OglasRequestDto {
    private List<Long> posao_tip;
    private String mjesto;

}
