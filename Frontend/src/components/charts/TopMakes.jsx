import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import formatCash from '../../lib/formatCash';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../UI/Table';

const TopMakes = () => {


    const { data, isLoading } = useQuery({
        queryKey: ['makesData'],
        queryFn: () =>
            axios
                .get('http://localhost:8000/topMakeSales')
                .then((res) => {
                    return res.data
                }),
    })
    if (isLoading) {
        return <p>Loading .................</p>
    }
    return (
        <Table>            
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/2">Make</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(r =>
                    <TableRow key={r.make}>
                        <TableCell className="font-medium">{r.make}</TableCell>
                        <TableCell>{r.total_sales}</TableCell>
                        <TableCell className="text-right">{formatCash(r.total_revenue)}</TableCell>
                    </TableRow>
                )}

            </TableBody>
        </Table>


    );
};

export default TopMakes;
