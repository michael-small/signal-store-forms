import {z} from 'zod'

type RawData = [string[], ...string[][]];

export function transformArrayToObject(data: RawData): Record<string, string[]> {
    const [headers, ...rows] = data;
    
    // Initialize the result object with empty arrays for each header
    const result: Record<string, any[]> = {};
    headers.forEach(header => {
        result[header] = [];
    });
    
    // Populate the arrays with values from each row
    rows.forEach(row => {
        headers.forEach((header, index) => {
            result[header].push(row[index]);
        });
    });
    
    return result;
}

// Example usage:
export const raw_data: RawData = [
    ['people', 'numbers'],
    ['Jeff', '123'],
    ['Jerry', '456']
];

const result = transformArrayToObject(raw_data)


export function zodify(data: Record<string, string[]>, zodTypes: ('number' | 'string')[]) {
    const results: {[x: string]: Partial<{
        number: boolean;
        string: boolean;
    }>}[] = []
    for (const key in data) {
        const dataAtKey = data[key]

        const validitiesSchema = z.object(
            {
                number: z.number(),
                string: z.string()
            }
        )

        const validities: Partial<{
            number: boolean;
            string: boolean;
        }> = {
            number: true,
            string: true,
        }

        for (let i = 0; i < dataAtKey.length; i++) {
            if (zodTypes.includes('number')) {
                if (z.coerce.number().safeParse(dataAtKey[i]).error) {
                    delete validities?.number
                }
            }
            if (zodTypes.includes('string')) {
                if (z.coerce.string().safeParse(dataAtKey[i]).error) {
                    delete validities?.string
                }
            }
        }

        let thing = {
            [key]: validities
        }

        results.push(thing)
    }
    return results;
}