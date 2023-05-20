import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

const FormularioCaidasPage = () => {
    return (
        <Box sx={{ m: 2 }}>
            <Typography variant='h1'>Formulario - Caidas</Typography>
            <Typography variant='h6'><i>Para Melissa :D</i></Typography>
            <Typography variant='h4'>Sección de máxima eficiencia hidráulica</Typography>
            <Typography> Para un canal rectangular de máxima eficiencia hidraúlica se cumple que:</Typography>
            <BlockMath math="\frac{tirante}{base}=\frac{y}{b}=2" />
            <Typography>Despejando de la ecuación de maning tenemos:</Typography>
            <BlockMath math="Q=\frac{area \cdot radioHidraulico^{2/3} \cdot pendiente^{1/2}) }{n}" />
            <BlockMath math="y=\left(\frac{caudal*n}{pendiente^{1/2}\cdot 2^{1/3}}\right)^{3/8}" />
            <Typography>n = coeficiente que depende de la rugosidad de la pared</Typography>
            <br />
            <Typography>Con el tirante calculado, para calcular la base tenemos:</Typography>
            <BlockMath math="b=2y" />

            <br />
            <Divider />

            <Typography variant='h4'>Cálculo del tirante crítico</Typography>
            <Typography>Para un canal rectangular tenemos:</Typography>
            <BlockMath math="y_c=\sqrt[3]{\frac{q}{g}}"></BlockMath>
            <BlockMath math="tiranteCritico=\sqrt[3]{\frac{caudalEspecifico}{gravedad}}" />
            <BlockMath math="q=\frac{Q}{b}" />
            <BlockMath math="caudalEspecifico=\frac{caudal}{ancho}" />

            <br />
            <Divider />

            <Typography variant='h4'>Factores</Typography>
            <Typography variant='h6'>Número de caida o salto</Typography>
            <BlockMath math="numCaida=\frac{y_c}{\Delta z}" />

            <Typography variant='h6'>Cálculo de l_t</Typography>
            <BlockMath math="l_t=\Delta z \cdot 4.30 \cdot \left( \frac{y_c}{\Delta z} \right)^{0.81}" />

            <Typography variant='h6'>Cálculo de d_p</Typography>
            <BlockMath math="d_p=\Delta z \cdot \left( \frac{y_c}{\Delta z} \right)^{0.66}" />

            <Typography variant='h6'>Cálculo de d_1</Typography>
            <BlockMath math="d_1=\Delta z \cdot 0.54 \cdot \left( \frac{y_c}{\Delta z} \right)^{1.275}" />

            <Typography variant='h6'>Cálculo de d_2</Typography>
            <BlockMath math="d_2=\Delta z \cdot 1.66 \cdot \left( \frac{y_c}{\Delta z} \right)^{0.81}" />

            <Typography variant='h6'>Cálculo de l_j</Typography>
            <BlockMath math="l_j=(d_2-d_1)*6.9" />

            <br />
            <Divider />

            <Typography variant='h4'>Diseño de la ventilación</Typography>
            <Typography variant='h6'>Cálculo del diámetro de la tubería de ventilación</Typography>

            <BlockMath math="Energia_1=Energia_2" />
            <BlockMath math="z_1+\frac{P_1}{\gamma}+\frac{V_1}{2\cdot g}=z_2+\frac{P_1}{\gamma}+\frac{V_2}{2\cdot g} + h_t " />
            <BlockMath math="z_1+\cancel{\frac{P_1}{\gamma}}+\cancel{\frac{V_1}{2\cdot g}}=\cancel{z_2}+\frac{P_2}{\gamma}+\cancel{\frac{V_2}{2\cdot g}} + h_t " />

            <BlockMath math="z_1=\frac{P_2}{\gamma}+h_t" />
            <BlockMath math="z_1=\frac{P_2}{\gamma}+h_{friccion}+h_{locales}" />
            <BlockMath math="z_1=\frac{P_2}{\gamma}+(h_{friccion})+(h_{entrada}+h_{curvas}+h_{salida})" />
            <BlockMath math="z_1=\frac{P_2}{\gamma}+\left( \frac{f\cdot L \cdot V}{2 \cdot g \cdot D} \right)+ \left(\frac{k_e \cdot V^2}{2\cdot g}+\frac{k_c \cdot V^2}{2\cdot g}+\frac{k_s \cdot V^2}{2\cdot g}\right)" />
            <BlockMath math="z_1=\frac{P_2}{\gamma}+\left( \frac{f\cdot L}{D}+ k_e+k_c +k_s \right) \cdot \frac{V ^ 2}{2\cdot g}" />

            <Typography variant='h6'>Cálculo de l_1</Typography>
            <Typography>l_1 = longitud de la  tuberia vertical desde el orificio hacia la base del canal</Typography>

            <BlockMath math="l_1=\frac{\Delta z -d_p}{2}" />

            <Typography variant='h6'>Cálculo de l_2</Typography>
            <BlockMath math="l_2=y+0.40 +0.30" />
            <Typography>l_2 = longitud de la tuberia vertical desde la base del canal hasta sobresalir la superficie de agua.</Typography>
            <Typography>y = tirante del canal rectangular</Typography>
            <Typography>0.40 = bordo libre</Typography>
            <Typography>0.30 = por motivos de seguridad</Typography>
            <br />

            <Typography variant='h6'>Cálculo de la longitud de la tuberia de ventilación</Typography>
            <BlockMath math="longitudTubVentilacion=0.50+b/2+l_1+l_2" />
            <Typography>0.50 = distancia del orificio hacia el interior del terreno(en sentido longitudinal al recorrido del agua)</Typography>
            <Typography>b/2 = distancia horizontal desde el orificio hacia un costado del canal</Typography>
            <br />

            <Typography variant='h6'>Cálculo de z_1</Typography>
            <Typography>z_1 = desnivel entre la tuberia de entrada de aire, hacia el orificio de ventilación</Typography>
            <BlockMath math="z_1=l_1+l_2" />
            <br />

            <Typography variant='h6'>Cálculo de z_1</Typography>
            <Typography>Para convertir la presión del agua en presión del aire.</Typography>
            <BlockMath math="\left[\frac{P}{\gamma}\right]_{aire}=\left[\frac{P}{\gamma}\right]_{agua} \cdot \frac{\rho_{agua}}{\rho_{aire}}" />

            <Typography>Presión maxima de succión: 0.04 metros de columna de agua.</Typography>
            <BlockMath math="\left[\frac{P}{\gamma}\right]_{agua} = 0.04" />
            <br />

            <Typography variant='h6'>Cálculo del caudal específico del aire</Typography>
            <BlockMath math="q_{aire}=\frac{q}{\left(\frac{d_p}{y}\right)^{1.5}}" />
            <br />

            <Typography variant='h6'>Cálculo del caudal del aire</Typography>
            <BlockMath math="Q_{aire}=q_{aire}\cdot b" />
            <Typography>b = base del canal rectangular</Typography>

            <BlockMath math="Q=V \times area" />
            <BlockMath math="V=\frac{Q_{aire}}{area}" />
            <BlockMath math="V=\frac{4\cdot Q_{aire}}{\pi \cdot D^2}" />

            <br />

            <Typography>Para calcular las perdidas necesitamos conocer el valor de:</Typography>
            <BlockMath math="\frac{V^2}{2\cdot g}" />
            <Typography>Asi que elevaremos al cuadrado la anterior expresión dejandola en función de "D".</Typography>
            <BlockMath math="\frac{V^2}{2\cdot g}=\frac{(\frac{4\cdot Q_{aire}}{\pi \cdot D^2})^2}{2\cdot g}" />
            <Typography>Esta expresión la reemplazaremos en:</Typography>
            <BlockMath math="z_1=\frac{P_2}{\gamma}+\left( \frac{f\cdot L}{D}+ k_e+k_c +k_s \right) \cdot \frac{V^2}{2\cdot g}"></BlockMath>
            <Typography> Donde obtendremos una expresión semejante a: </Typography>
            <BlockMath math="4.358=-33.33+\left( \frac{0.02 \cdot 6.370}{D}+ 0.5+2 \cdot 1.1 +1 \right) \cdot \frac{0.0359}{D^4}" />
            <Typography>Para resolver esta ecuación utilizaremos una calculadora científica o un método numérico.</Typography>
            <Typography>Con el diámetro obtenido podremos calcular el área y la velocidad del aire en la tubería.</Typography>
            <br />

        </Box>
    )
}

export default FormularioCaidasPage