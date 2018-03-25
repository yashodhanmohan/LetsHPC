import DbObject from './DbObject.schema';

export default interface MachineSchema extends DbObject {
    machine_file: string;
    architecture: string;
    cpu_opmode: string;
    byte_order: string;
    cpu_count: number;
    threads_per_core: number;
    cores_per_socket: number;
    socket_count: number;
    numa_node_count: number;
    vendor_id: string;
    cpu_family: string;
    model: string;
    model_name: string;
    stepping: number;
    cpu_mhz: number;
    cpu_max_mhz: number;
    cpu_min_mhz: number;
    bogomips: number;
    virtualization: string;
    L1d_cache: string;
    L1i_cache: string;
    L2_cache: string;
    L3_cache: string;
    flags: string;
    spec_file_link: string;
}