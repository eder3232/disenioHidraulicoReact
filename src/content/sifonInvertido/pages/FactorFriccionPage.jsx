import React, { useState } from 'react'

import { log10, log, abs } from 'mathjs'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField'

import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { keyframes } from 'styled-components';

const FactorFriccionPage = () => {
    const [stateString, setStateString] = useState({ k_string: "0.0015", d_string: "1.5", Re_string: "3706665" })
    const { k_string, d_string, Re_string } = stateString
    let stateNumber = {}
    for (let prop in stateString) {
        stateNumber[prop.split('_')[0]] = Number(stateString[prop])
    }

    function handleChange(event) {
        setStateString((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const { k, d, Re } = stateNumber

    let initialValue = 0.001
    let solution
    let case1 = false
    const steps = []
    if (Re <= 2200) {
        solution = (64 / Re)
        case1 = true
    } else {
        let current
        let func
        let der
        let next = 1 / initialValue ** 0.5
        do {
            const obj = { current: next }
            current = next
            func = -2 * log10(k / (3.7 * d) + (2.51 * current) / Re)
            der =
                (-2 / log(10)) * (2.51 / Re / (k / (3.7 * d) + (2.51 * current) / Re))
            next = current - (func - current) / (der - 1)
            obj.factor = 1 / next ** 2
            obj.func = func
            obj.der = der
            obj.next = next
            steps.push(obj)
        } while (abs(next - current) > 0.000001)
        // console.log(steps)
        solution = 1 / next ** 2
    }



    return (
        <Box sx={{ m: 2 }}>
            <Typography variant="h4">Factor de fricción</Typography>
            <Box sx={{ m: 2 }}>

                <Box sx={{ m: 1 }}>
                    <TextField
                        id="outlined-textarea"
                        name="k_string"
                        type="number"
                        value={k_string}
                        onChange={handleChange}
                        label="k"
                        placeholder="k"
                    />
                </Box>

                <Box sx={{ m: 1 }}>
                    <TextField
                        id="outlined-textarea"
                        name="d_string"
                        type="number"
                        value={d_string}
                        onChange={handleChange}
                        label="d"
                        placeholder="d"
                    />
                </Box>

                <Box sx={{ m: 1 }}>
                    <TextField
                        id="outlined-textarea"
                        name="Re_string"
                        type="number"
                        value={Re_string}
                        onChange={handleChange}
                        label="Re"
                        placeholder="Re"
                    />
                </Box>

            </Box>
            {case1 && (
                <BlockMath math={`f= ${solution}`} />
            )}

            {!case1 && (
                <Box sx={{ m: 2 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">xi</TableCell>
                                    <TableCell align="right">F(x)</TableCell>
                                    <TableCell align="right">F'(x)</TableCell>
                                    <TableCell align="right">xi+1</TableCell>
                                    <TableCell align="right">f</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {steps.map((row) => (
                                    <TableRow
                                        key={row.current.toString()}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{row.current.toFixed(3)}</TableCell>
                                        <TableCell align="right">{row.func.toFixed(3)}</TableCell>
                                        <TableCell align="right">{row.der.toFixed(4)}</TableCell>
                                        <TableCell align="right">{row.next.toFixed(4)}</TableCell>
                                        <TableCell align="right">{row.factor.toFixed(8)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ m: 4 }}>
                        <BlockMath math={`f= ${solution}`} />
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default FactorFriccionPage