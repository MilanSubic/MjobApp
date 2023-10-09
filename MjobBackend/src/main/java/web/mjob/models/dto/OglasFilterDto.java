package web.mjob.models.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OglasFilterDto {
    private String mjesto;
    private List<String> posaoTip;
    private BigDecimal min;
    private BigDecimal max;
}
