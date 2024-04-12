export async function paginatedResults<T>(
	data: T[],
	page: number,
	limit: number,
): Promise<PaginatedResults<T>> {
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results: PaginatedResults<T> = { results: [] };

	const totalDocuments = data.length;

	if (endIndex < totalDocuments) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit,
		};
	}

	results.results = data.slice(startIndex, endIndex);
	return results;
}

// Interface for PaginatedResults
interface PaginatedResults<T> {
	results: T[];
	next?: { page: number; limit: number };
	previous?: { page: number; limit: number };
}
