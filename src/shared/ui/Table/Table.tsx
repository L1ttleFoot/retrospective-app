import * as style from './Table.css';

export type TableProps = {data: Record<string, string | number | object>[]};

export const Table = ({data}: TableProps) => {
	if (!data.length) {
		return null;
	}

	const headers = Object.keys(data[0]);
	const values = data.map((item) => Object.values(item).map((item) => item.toString()));

	return (
		<table className={style.table}>
			<thead>
				<tr>
					{headers.map((head) => (
						<th key={head} className={style.headCell}>
							{head}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{values.map((row) => (
					<tr>
						{row.map((cell) => (
							<td className={style.cell}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
