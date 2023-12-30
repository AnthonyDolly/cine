import { Request, Response } from 'express';
import { ProjectionService } from './projection.service';
import { CustomError } from '../../errors/custom.error';
import { CreateProjectionDto } from './dtos/create-projection.dto';

export class ProjectionController {
  constructor(private readonly projectionService: ProjectionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getProjections = async (req: Request, res: Response) => {
    this.projectionService
      .getProjections()
      .then((projections) => res.status(200).json(projections))
      .catch((error) => this.handleError(error, res));
  };

  getProjectionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.projectionService
      .getProjectionById(id)
      .then((projection) => res.status(200).json(projection))
      .catch((error) => this.handleError(error, res));
  };

  createProjection = async (req: Request, res: Response) => {
    const [error, createProjectionDto] = CreateProjectionDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    this.projectionService
      .createProjection(createProjectionDto!)
      .then((projection) => res.status(201).json(projection))
      .catch((error) => this.handleError(error, res));
  };

  updateProjection = async (req: Request, res: Response) => {
    res.json('updateProjection');
  };

  deleteProjection = async (req: Request, res: Response) => {
    res.json('deleteProjection');
  };
}
