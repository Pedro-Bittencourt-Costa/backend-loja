import { Router } from "express";


const faculdadeRouter = Router();
const faculdadeService = new FaculdadeService();
const faculdadeController = new FaculdadeController(faculdadeService);

// Rotas personalizadas
faculdadeRouter.get('/descricao/:descricao', authorizeRoles(Role.PRO_REITOR, Role.ALUNO, Role.PROFESSOR, Role.PARECERISTA, Role.DIRETOR) as any, authenticateJWT, asyncWrapper(faculdadeController.findByDescricao.bind(faculdadeController)));

// Rotas padrão do CRUD
faculdadeRouter.get('/', authenticateJWT, authorizeRoles(Role.PRO_REITOR, Role.ALUNO, Role.PROFESSOR, Role.PARECERISTA, Role.DIRETOR) as any, asyncWrapper(faculdadeController.findAll.bind(faculdadeController)));
faculdadeRouter.get('/:id', authenticateJWT, authorizeRoles(Role.PRO_REITOR, Role.ALUNO, Role.PROFESSOR, Role.PARECERISTA, Role.DIRETOR) as any, asyncWrapper(faculdadeController.findById.bind(faculdadeController)));
faculdadeRouter.post('/', authenticateJWT, authorizeRoles(Role.PRO_REITOR) as any,  validateDto(FaculdadeCreateDto), asyncWrapper(faculdadeController.create.bind(faculdadeController)));
faculdadeRouter.put('/:id', authenticateJWT, authorizeRoles(Role.PRO_REITOR) as any, validateDto(FaculdadeUpdateDto), asyncWrapper(faculdadeController.update.bind(faculdadeController)));



export { faculdadeRouter };