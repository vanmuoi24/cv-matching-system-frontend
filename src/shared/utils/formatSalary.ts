export const formatSalary = (min: number | undefined | null, max: number | undefined | null) => {
	if (!min && !max) return 'Thoả thuận';
	if (min === 0 && max === 0) return 'Thoả thuận';
	
	const minStr = min ? min.toLocaleString() : '0';
	const maxStr = max ? max.toLocaleString() : '0';
	
	return `${minStr} - ${maxStr} $`;
};
