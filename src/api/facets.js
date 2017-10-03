import _ from 'lodash';
import { Router } from 'express';
import facets from '../models/facets';

function getFacet(req) {
  const { id } = req.params;
  const facet = facets.find(f => f.id === id);
  return facet;
}

export default () => {
  const api = Router();

  /** GET / -> Index */
  api.get('/', (req, res) => {
    res.json(facets);
  });

  /** POST / -> Create new resource */
  api.post('/', (req, res) => {
    const { body } = req;
    body.id = facets.length.toString(36);
    facets.push(body);
    req.logger(`Created facet ${body.id}`);
    res.json(body);
  });

  /** GET /29 -> Get resource with ID 29 */
  api.get('/:id', (req, res) => {
    const facet = getFacet(req);
    if (facet) res.json(facet);
    else res.status(404).json({ msg: 'Not found' });
  });

  /** PUT /29 -> Update resource with ID 29 */
  api.put('/:id', (req, res) => {
    req.logger(`Updating facet ${req.params.id}`);
    const { body } = req;
    const facet = getFacet(req);
    _.forEach(body, (value, key) => {
      if (key !== 'id') {
        facet[key] = body[key];
      }
    });
    res.sendStatus(204);
  });

  /** DELETE /29 -> Delete resource with ID 29 */
  api.delete('/:id', (req, res) => {
    req.logger(`Deleting facet ${req.params.id}`);
    const facet = getFacet(req);
    facets.splice(facets.indexOf(facet), 1);
    res.sendStatus(204);
  });
};
