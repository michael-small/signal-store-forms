import {z} from 'zod'

export function transformCSVToDataRecords(data: string[][]): Record<string, string[]> {
    const [headers, ...rows] = data;
    
    // Start with empty arrays for each header
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

export function zodify(data: Record<string, string[]>, zodTypes: ('number' | 'string')[]) {
    const results: {[x: string]: Partial<{
        number: boolean;
        string: boolean;
    }>}[] = []

    for (const key in data) {
        const dataAtKey = data[key]

        const validities: Partial<{
            number: boolean;
            string: boolean;
        }> = {
            number: true,
            string: true,
        }

        for (let i = 0; i < dataAtKey.length; i++) {
            if (zodTypes.includes('number') && z.coerce.number().safeParse(dataAtKey[i]).error) {
                delete validities?.number
            }
            if (zodTypes.includes('string') && z.coerce.string().safeParse(dataAtKey[i]).error) {
                delete validities?.string
            }
        }

        results.push({
            [key]: validities
        })
    }
    return results;
}