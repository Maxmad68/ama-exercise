import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as fs from 'fs';

class InitialFormatObject {
  name: string;
  date: string;
  day: number;
}

class FinalFormatObject {
  name: string;
  values: [string];
}

@Injectable()
export class TransformDataService {
  async transform(filepath: string) {
    // Read and parse json file at given path
    let json;
    try {
      const content = fs.readFileSync(filepath, 'utf8');
      json = JSON.parse(content);
    } catch (err) {
      throw new ServiceUnavailableException('Error while reading file');
    }

    const initial_data = json as InitialFormatObject[];

    // Transform data

    const already_used_names = new Map();
    const final_data = [];
    for (const data of initial_data) {
      if (
        data.name === undefined ||
        data.date === undefined ||
        data.day === undefined
      ) {
        throw new ServiceUnavailableException('Error while parsing file');
      }

      // Convert date to new format
      const date = data.date.split('/');
      const day = ('' + data.day).padStart(2, '0');
      const new_date = date[1] + '-' + date[0] + '-' + day;

      // Add to final_data
      if (already_used_names.has(data.name)) {
        const index = already_used_names.get(data.name);
        final_data[index].values.push(new_date);
      } else {
        already_used_names.set(data.name, final_data.length);
        final_data.push({
          name: data.name,
          values: [new_date],
        } as FinalFormatObject);
      }
    }

    // Return transformed data
    return final_data;
  }
}
