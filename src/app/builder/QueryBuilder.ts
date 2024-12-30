import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search as string;
    if (search && searchableFields.length) {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })) as FilterQuery<T>[];
      this.modelQuery = this.modelQuery.find({ $or: searchConditions });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    for (const [key, value] of Object.entries(queryObj)) {
      if (key.startsWith('filter')) {
        const filterField = key.split('.')[1];
        if (filterField) {
          this.modelQuery = this.modelQuery.find({
            [filterField]: value,
          } as FilterQuery<T>);
        }
      }
    }

    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy as string;
    const sortOrder = this?.query?.sortOrder === 'asc' ? '' : '-';
    const sortField = sortOrder + (sortBy || 'createdAt');
    this.modelQuery = this.modelQuery.sort(sortField);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
