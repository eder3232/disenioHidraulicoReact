import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'

// import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from 'react-equation'
// import { defaultVariables, defaultFunctions } from 'equation-resolver'

import dibujo from '../assets/dibujo.png'

import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import FactorFriccion from '../components/FactorFriccion'

const SifonInvertido = () => {
    const [sifon, setSifon] = useState({
        tramoA_string: "30",
        tramoB_string: "35",
        tramoC_string: 29,
        angCurva1_string: 45,
        radio1_string: 8,
        angCurva2_string: 45,
        radio2_string: 5,
        caudal_string: 5,
        diametro_string: "1.5",
        viscosidad_string: "0.000001145",
        rugosidadAbs_string: "0.0015",
        // longitud: 0,
    })

    const [friccion, setFriccion] = useState(0.019720)

    let sifonNumber = {}
    for (let prop in sifon) {
        sifonNumber[prop.split('_')[0]] = Number(sifon[prop])
    }
    let {
        tramoA,
        tramoB,
        tramoC,
        angCurva1,
        angCurva2,
        radio1,
        radio2,
        caudal,
        diametro,
        viscosidad,
        rugosidadAbs
        // longitud,
    } = sifonNumber
    let {
        tramoA_string,
        tramoB_string,
        tramoC_string,
        angCurva1_string,
        angCurva2_string,
        radio1_string,
        radio2_string,
        caudal_string,
        diametro_string,
        viscosidad_string,
        rugosidadAbs_string
        // longitud,
    } = sifon



    // const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/

    function handleChange(event) {
        // if (rx_live.test(event.target.value)) {
        //     console.log('ok')
        setSifon((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
        // }
    }

    function friccionSetter(f) {
        setFriccion(f)
    }

    let longitud = tramoA + tramoB + tramoC +
        (radio1 * angCurva1 * Math.PI) / 180 +
        (radio2 * angCurva2 * Math.PI) / 180

    let area = Math.PI * diametro ** 2 / 4
    let velocidad = caudal / area
    let reynolds = velocidad * diametro / viscosidad
    let perdidasFriccion = friccion * longitud * velocidad ** 2 / (diametro * 2 * 9.81)
    let k1 = 0.131 + 1.848 * (((diametro) / 2) / radio1) ** 3.5
    let k2 = 0.131 + 1.848 * (((diametro) / 2) / radio2) ** 3.5
    let local1 = k1 * velocidad ** 2 / (2 * 9.81) * (angCurva1 / 90) ** 0.5
    let local2 = k2 * velocidad ** 2 / (2 * 9.81) * (angCurva1 / 90) ** 0.5
    // console.log(friccion)
    return (
        <Box
            sx={{
                p: 2,
            }}
        >
            <Typography variant="h2">Sifon invertido</Typography>
            <Typography variant="body1">
                Un sifón invertido para cruzar un abarranco, consiste en una tubería de
                acero soldado de 1.5 m de diámetro, el gasto máximo es de 5 m³/s y la
                velocidad en la tubería es el doble de la velocidad en los canales de
                llegada y salida. Determinar el desnivel delta z entre las plantillas de
                los dos canales, viscosidad relativa = 1.145 x 10-6, rugosidad=1.33 mm.
            </Typography>
            <Box
                sx={{
                    width: { xs: 350, sm: 550, md: 850, lg: 1100, xl: 1400 },
                    height: 'auto',
                    m: 2,
                }}
            >
                <img src={dibujo} style={{ width: 'inherit' }} alt="dibujo" />
            </Box>

            <Typography variant="h4">Solución:</Typography>

            <Typography variant="h5">
                1) La energía en el punto 1 es igual a la energía en el punto 2 más las
                perdidas.
            </Typography>

            <BlockMath math="E_1 = E_2 + h_t" />
            <BlockMath math="z_1 + \frac{P}{\gamma} + \frac{V^2}{2g}=z_2 + \frac{P}{\gamma} +\frac{V^2}{2g} + h_t" />
            <BlockMath math="z_1 +\cancel{\frac{P}{\gamma}} + \cancel{\frac{V^2}{2g}}=z_2 + \cancel{\frac{P}{\gamma}} +\cancel{\frac{V^2}{2g}} +h_t" />
            <BlockMath math="z_1 - z_2 = h_t" />
            <BlockMath math="\Delta z  = h_t" />

            <Typography variant="h5">2) Calculas las perdidas totales.</Typography>
            <BlockMath math="h_t = h_{totales} = h_{sistema}= h_{friccion} + h_{locales}" />
            <Typography>Dentro de las perdidas locales tenemos:</Typography>

            <List dense={true}>
                <ListItem>
                    <ListItemText
                        primary="Regillas"
                    // secondary='Secondary text'
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Perdidas en la entrada(contracción)" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Perdidas en la salida(ensanche)" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Codos" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Curvas" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Valvulas" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Etc." />
                </ListItem>
            </List>

            <Typography>Calculando las perdidas por fricción:</Typography>
            <Typography>Usando Darcy-Weisbach</Typography>
            <BlockMath math="h_{friccion}=f\cdot {\frac {L}{D}}\cdot {\frac {V^{2}}{2g}}" />
            <Typography>Calculando la longitud de la tuberia:</Typography>

            <Box sx={{ mt: 2 }}>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="tramoA_string"
                            type="number"
                            value={tramoA_string}
                            onChange={handleChange}
                            label="tramo A"
                            placeholder="tramo A"
                        />
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="tramoB_string"
                            type="number"
                            value={tramoB_string}
                            onChange={handleChange}
                            label="tramo B"
                            placeholder="tramo B"
                        />
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="tramoC_string"
                            type="number"
                            value={tramoC_string}
                            onChange={handleChange}
                            label="tramo C"
                            placeholder="tramo C"
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="angCurva1_string"
                            type="number"
                            value={angCurva1_string}
                            onChange={handleChange}
                            label="angCurva 1"
                            placeholder="angCurva 1"
                        />
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="radio1_string"
                            type="number"
                            value={radio1_string}
                            onChange={handleChange}
                            label="radio 1"
                            placeholder="radio 1"
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="angCurva2_string"
                            type="number"
                            value={angCurva2_string}
                            onChange={handleChange}
                            label="angCurva 2"
                            placeholder="tramo A"
                        />
                    </Box>
                    <Box sx={{ m: 1 }}>
                        <TextField
                            id="outlined-textarea"
                            name="radio2_string"
                            type="number"
                            value={radio2_string}
                            onChange={handleChange}
                            label="radio 2"
                            placeholder="radio 2"
                        />
                    </Box>
                </Box>
            </Box>

            <BlockMath
                math={`L= ${tramoA} + ${tramoB} + ${tramoC} + ${radio1} \\times \\left(  ${angCurva1} \\times \\frac{\\pi}{180} \\right) +  ${radio2} \\times \\left(  ${angCurva2} \\times \\frac{\\pi}{180} \\right)`}
            />

            <BlockMath math={`L= ${longitud.toFixed(3)} m`}></BlockMath>
            <Typography>Calculando la velocidad:</Typography>
            <BlockMath math="Q=V*A" />
            <BlockMath math="V=\frac{Q}{A}" />

            <Box sx={{ m: 1 }}>
                <TextField
                    id="outlined-textarea"
                    name="caudal_string"
                    type="number"
                    value={caudal_string}
                    onChange={handleChange}
                    label="caudal(m3/s)"
                    placeholder="caudal(m3/s)"
                />
            </Box>
            <Box sx={{ m: 1 }}>
                <TextField
                    id="standard-number"
                    name="diametro_string"
                    type="number"
                    value={diametro_string}
                    onChange={handleChange}
                    label="diametro(m)"
                    placeholder="diametro(m)"
                // InputLabelProps={{
                //     shrink: true,
                // }}
                // variant="standard"
                />
            </Box>


            <BlockMath math={`A=\\pi \\times \\frac{${diametro}^{2}}{4}`} />
            <BlockMath math={`A=${area.toFixed(3)}m^2`} />
            <BlockMath math={`V=\\frac{${caudal}}{${area.toFixed(3)}}`} />
            <BlockMath math={`V=${velocidad.toFixed(3)} m/s^2`} />


            <Typography>Calculando el factor de fricción:</Typography>
            <Box
                sx={{ mt: 2 }}
            >
                <Box sx={{ m: 1 }}>
                    <TextField
                        id="outlined-textarea"
                        name="viscosidad_string"
                        type="number"
                        value={viscosidad_string}
                        onChange={handleChange}
                        label="viscosidadCinematica(m^2/s)"
                        placeholder="viscosidadCinematica(m^2/s)"
                    />
                </Box>
                <BlockMath math="Re= \frac{V \times d}{\nu}" />
                <BlockMath math={`Re= ${reynolds.toFixed(3)}`} />
            </Box>

            <Box sx={{ m: 1 }}>
                <TextField
                    id="outlined-textarea"
                    name="rugosidadAbs_string"
                    type="number"
                    value={rugosidadAbs_string}
                    onChange={handleChange}
                    label="rugosidadAbs(m)"
                    placeholder="rugosidadAbs(m)"
                />
            </Box>

            <FactorFriccion k={rugosidadAbs} d={diametro} Re={reynolds} setFriccion={setFriccion} />
            <BlockMath math="h_{friccion}=f\cdot {\frac {L}{D}}\cdot {\frac {V^{2}}{2g}}" />
            <BlockMath math={`h_{friccion}=${friccion.toFixed(5)}\\cdot {\\frac {${longitud.toFixed(3)}}{${diametro.toFixed(3)}}}\\cdot {\\frac {${velocidad.toFixed(3)}^{2}}{2 \\cdot 9.81}}`} />
            <BlockMath math={`h_{friccion}=${perdidasFriccion.toFixed(3)} m`} />

            <Typography>Calculando las perdidas menores:</Typography>
            <BlockMath math="h_{locales}=K_i\cdot \frac{V^2}{2g} \cdot \left(\frac{angulo_{curva}}{90}\right)^2" />
            <Typography>Calculando el factor k de las curvas:</Typography>
            <BlockMath math="k=0.131+1048 \cdot \frac{Radio_{tuberia}}{Radio_{curvatura}}" />
            <BlockMath math={`k_1=0.131+1048 \\cdot \\frac{${diametro / 2}}{${radio1}}`} />
            <BlockMath math={`k_1=${k1.toFixed(3)}`} />
            <BlockMath math={`k_2=0.131+1048 \\cdot \\frac{${diametro / 2}}{${radio2}}`} />
            <BlockMath math={`k_2=${k2.toFixed(3)}`} />

            <Typography>Para la curva 1:</Typography>
            <BlockMath math={`h_{local1}=${k1.toFixed(3)}\\cdot \\frac{${velocidad.toFixed(3)}^2}{2*9.81} \\cdot \\left(\\frac{${angCurva1}}{90}\\right)^2`} />
            <BlockMath math={`h_{local1}=${local1.toFixed(3)} m`} />
            <Typography>Para la curva 2:</Typography>
            <BlockMath math={`h_{local2}=${k2.toFixed(3)} \\cdot \\frac{${velocidad.toFixed(3)}^2}{2*9.81} \\cdot \\left(\\frac{${angCurva2}}{90}\\right)^2`} />
            <BlockMath math={`h_{local2}=${local2.toFixed(3)} m`} />
            <Typography>Perdidas locales:</Typography>
            <BlockMath math={`h_{locales}=${local1.toFixed(3)}m+${local2.toFixed(3)}m`} />
            <BlockMath math={`h_{locales}=${(local1 + local2).toFixed(3)}m`} />
            <Typography>Perdidas totales:</Typography>
            <BlockMath math={`h_{total}=${perdidasFriccion.toFixed(3)}m+${(local1 + local2).toFixed(3)}m`} />
            <BlockMath math={`h_{total}=${(perdidasFriccion + local1 + local2).toFixed(3)}m`} />
            <BlockMath math="\Delta z  = h_t" />
            <BlockMath math={`\\Delta z=${(perdidasFriccion + local1 + local2).toFixed(3)}m`} />
        </Box >
    )
}

export default SifonInvertido
