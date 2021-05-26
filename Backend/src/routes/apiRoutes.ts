import { Router } from 'express';
import { apiController } from '../controllers/apiController';
class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', apiController.loginUser);
        this.router.post('/register', apiController.postUser);
        this.router.post('/postComic', apiController.postComic);
        this.router.get('/comics', apiController.getComics);
        this.router.get('/editoriales', apiController.getEditoriales);
        this.router.put('/updateComic', apiController.updateComic);
        this.router.delete('/deleteComic/:idComic', apiController.deleteComic);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;
