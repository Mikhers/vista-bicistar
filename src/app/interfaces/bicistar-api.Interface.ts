export interface SedeInterface{
    id_sede?:number
    nombre_sede:string
    direccion_sede:string
    ciudad_sede:string

}

export interface ProveedorInterface{
    id_proveedor?:number
    nombre_proveedor:string
    direccion_proveedor?:string
    telefono_proveedor?:string
    email_proveedor?:string

}

export interface PedidosInterface{
    id_pedido?:number
    fecha_realizado?:string
    fecha_llegada:string
    estado_pedido:string
    total_pedido:number
    id_sede:number
    id_proveedor:number
    id_empleado:number
}

export interface EmpleadosInterface{
    id_empleado?:number
    nombre_empleado:string
    apellido_empleado?:string
    email_empleado:string
    password_empleado:string
    permiso_empleado?:string
    rol_empleado?:string
    salario_empleado?:number
    id_sede:number
}

export interface categoriaInterface{
    id_categoria_producto?: number
    nombre_categoria_producto: string
    descripcion_categoria_producto?: string
}

export interface productoInteface {
    id_producto?: number;
    nombre_producto?: string;
    descripcion_producto?: string;
    precio_producto?: number;
    codigo_producto?: string;
    stock?:number;
    id_categoria_producto: number;
    
}
export interface SedeProductoInterface{
    id_sede?: number
    id_producto: number
    stock: number
}

export interface PedidoProductoInterface{
    id_pedido?: number;
    id_producto: number;
    cantidad_producto: number;
    precio_unitario: number;
}

export interface CategoriaServicioInterface{
    id_categoria_servicio?: number;
    nombre_servicio: string;
    descripcion_servicio: string;
}

export interface ClientesInterface{
    id_cliente?: number;
    nombre_cliente?: string;
    apellido_cliente?: string;
    telefono_cliente?: string;
    email_cliente?: string;
    cc_cliente?: string;
    direccion_cliente?: string;
}

export interface ServiciosInterface{
    id_servicio?: number;
    nombre_servicio: string;
    descripcion_servicio: string;
    precio_servicio: number;
    id_categoria_servicio: number;
}

export interface facturasInterface{
    id_factura?:number;
    fecha_factura?:string;
    total:number;
    codigo_factura?:string;
    id_empleado:number;
    cc_cliente?:string;
    id_sede:number;    
}
export interface ProductoFacturaInterface{
    id_factura: number,
    id_producto: number,
    cantidad: number,
    precio_venta: number
}
export interface ServicioFacturaInterface{
    id_factura: number,
    id_servicio: number,
    cantidad: number,
    precio_venta: number
}