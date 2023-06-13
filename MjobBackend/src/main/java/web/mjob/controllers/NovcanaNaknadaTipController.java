package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.dto.PosaoTip;
import web.mjob.services.NovcanaNaknadaTipService;

import java.util.List;

@RestController
@RequestMapping("/tipoviNovcaneNaknade")
public class NovcanaNaknadaTipController {
    private final NovcanaNaknadaTipService novcanaNaknadaTipService;

    public NovcanaNaknadaTipController(NovcanaNaknadaTipService novcanaNaknadaTipService) {
        this.novcanaNaknadaTipService=novcanaNaknadaTipService;
    }
    @GetMapping
    List<NovcanaNaknadaTip> getAll()
    {
        return novcanaNaknadaTipService.getAll();
    }
}
